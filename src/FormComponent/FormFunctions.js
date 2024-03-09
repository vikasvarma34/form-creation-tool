import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const savedForm = localStorage.getItem('savedForm');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    } else {
      setForm(initialState); 
    }
  }, [initialState, setForm]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      questionId: uuidv4(),
      order: form.questions.length + 1,
      questionText: '',
      type: '',
      isOptional: false,
      options: [],
      parentId: '',
    };
    setForm((prevForm) => ({
      ...prevForm,
      questions: [...prevForm.questions, newQuestion],
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...form.questions];
    questions[index] = { ...questions[index], [name]: value };
    setForm((prevForm) => ({
      ...prevForm,
      questions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { name, value } = e.target;
    const questions = [...form.questions];
    questions[questionIndex].options[optionIndex] = {
      ...questions[questionIndex].options[optionIndex],
      [name]: value,
    };
    setForm((prevForm) => ({
      ...prevForm,
      questions,
    }));
  };

  const addOption = (questionIndex) => {
    const newOption = {
      optionId: uuidv4(),
      value: '',
      text: '',
      jump: 'false',
      jumpTo: ''
    };
    const updatedQuestions = [...form.questions];
    updatedQuestions[questionIndex].options.push(newOption);
    setForm((prevForm) => ({
      ...prevForm,
      questions: updatedQuestions,
    }));
  };

  const deleteQuestion = (questionIndex) => {
    const updatedQuestions = form.questions.filter((_, index) => index !== questionIndex).map((question, index) => ({
      ...question,
      order: index + 1
    }));
    setForm((prevForm) => ({
      ...prevForm,
      questions: updatedQuestions,
    }));
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setForm((prevForm) => ({
      ...prevForm,
      questions: updatedQuestions,
    }));
  };

  const duplicateQuestion = (index) => {
    const originalQuestion = form.questions[index];
    const duplicatedQuestion = { ...originalQuestion };
  
    duplicatedQuestion.questionId = uuidv4();
  
    duplicatedQuestion.options = originalQuestion.options.map(option => ({ ...option }));
  
   
    const updatedQuestions = [
      ...form.questions.slice(0, index + 1),
      duplicatedQuestion,
      ...form.questions.slice(index + 1)
    ];
  
    const reorderedQuestions = updatedQuestions.map((question, idx) => ({
      ...question,
      order: idx + 1
    }));
  
    // Update the form state
    setForm(prevForm => ({
      ...prevForm,
      questions: reorderedQuestions
    }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.formName || !form.formOrder || !form.title || !form.description || !form.tier || form.mandatory === '') {
      alert('Please fill out all required fields');
      return;
    }

    const formDataToSend = {
      formName: form.formName,
      order: parseInt(form.formOrder),
      title: form.title,
      description: form.description,
      tier: form.tier,
      mandatory: form.mandatory === 'yes',
      questions: form.questions.map(question => ({
        questionText: question.questionText,
        order: question.order,
        isOptional: question.isOptional,
        type: question.type,
        options: question.options.map(option => ({
          value: option.value,
          text: option.text,
          jump: option.jump === 'true',
          jumpTo: option.jump === 'true' ? parseInt(option.jumpTo) : undefined 
        })),
        ...(question.parentId && { parentId: question.parentId })
      }))
    };

    try {
      const response = await fetch('https://assess.cliniscripts.com:8081/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      alert('Error submitting form:', error.message);
    }
  };

  const handleSave = () => {
    localStorage.setItem('savedForm', JSON.stringify(form));
    alert('Form saved successfully!');
  };

  const handleClear = () => {
    localStorage.removeItem('savedForm');
    setForm(initialState);
    alert('Form cleared successfully!');
  };

  return {
    form,
    setForm,
    handleFormChange,
    addQuestion,
    handleQuestionChange,
    handleOptionChange,
    addOption,
    deleteQuestion,
    deleteOption,
    duplicateQuestion,
    handleSubmit,
    handleSave,
    handleClear,
  };
};
