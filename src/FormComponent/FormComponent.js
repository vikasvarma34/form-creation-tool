import React from 'react';
import {
  GlobalStyle,
  Header,
  Container,
  ButtonContainer,
  Button,
  Input,
  Select,
  QuestionContainer,
  OptionContainer,
  InputRow,
  Label,
  SubHeading,
  TrashIcon,
  DuplicateButton,
  DeleteButton,
} from './FormStyles.js';
import { useForm } from './FormFunctions.js';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  formName: '',
  formOrder: 0,
  title: '',
  description: '',
  tier: '',
  mandatory: '',
  questions: [],
};

const FormComponent = () => {
  const {
    form,
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
  } = useForm(initialState);

  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <GlobalStyle />
      <Header>Form Builder</Header>
      <Container>
        {!showForm && (
          <ButtonContainer>
            <Button onClick={() => setShowForm(true)}>Create a Form</Button>
          </ButtonContainer>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <Label>Form Name:</Label>
            <Input
              name="formName"
              placeholder="Form Name"
              value={form.formName}
              onChange={handleFormChange}
            />
            <Label>Form Order:</Label>
            <Input
              name="formOrder"
              type="number"
              placeholder="Form Order"
              value={form.formOrder}
              onChange={handleFormChange}
            />
            <Label>Title:</Label>
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleFormChange}
            />
            <Label>Description:</Label>
            <Input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleFormChange}
            />
            <Label>Tier:</Label>
            <Select
              name="tier"
              value={form.tier}
              onChange={handleFormChange}
            >
              <option value="">Select Tier</option>
              <option value="tier-1">Tier-1</option>
              <option value="tier-2">Tier-2</option>
              <option value="individual">Individual</option>
            </Select>
            <Label>Mandatory:</Label>
            <Select
              name="mandatory"
              value={form.mandatory}
              onChange={handleFormChange}
            >
              <option value="">Select Mandatory</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
            {form.questions.map((question, qIndex) => (
              <QuestionContainer key={question.questionId} alt={qIndex % 2 !== 0}>
                <SubHeading question>Question {question.order}:</SubHeading>
                <Select
                  name="type"
                  value={question.type}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                >
                  <option value="">Select Question Type</option>
                  <option value="single-choice">Single Choice</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="text">Text</option>
                </Select>
                <InputRow>
                  <Label>Parent ID:</Label>
                  <Input
                    name="parentId"
                    type="number"
                    placeholder="Parent ID"
                    value={question.parentId}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                  />
                </InputRow>
                <Label>Question Text:</Label>
                <Input
                  name="questionText"
                  placeholder="Question Text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                />
                <Label>Optional:</Label>
                <Select
                  name="isOptional"
                  value={String(question.isOptional)}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Select>
                {['single-choice', 'multiple-choice'].includes(question.type) && question.options.map((option, oIndex) => (
                  <OptionContainer key={option.optionId}>
                    <SubHeading>Option {oIndex + 1}:</SubHeading>
                    <InputRow>
                      <Label>Option Text:</Label>
                      <Input
                        name="text"
                        placeholder="Option Text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      />
                      <Label>Value:</Label>
                      <Input
                        name="value"
                        type="number"
                        placeholder="Value"
                        value={option.value}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      />
                    </InputRow>
                    <InputRow>
                      <Label>Jump:</Label>
                      <Select
                        name="jump"
                        value={option.jump}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </Select>
                      {option.jump === "true" && (
                        <>
                          <Label>Jump to:</Label>
                          <Input
                            name="jumpTo"
                            type="number"
                            placeholder="Jump To Question Number"
                            value={option.jumpTo}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                          />
                        </>
                      )}
                      <TrashIcon
                        icon={faTrash}
                        onClick={() => deleteOption(qIndex, oIndex)}
                      />
                    </InputRow>
                  </OptionContainer>
                ))}
                {['single-choice', 'multiple-choice'].includes(question.type) && (
                  <Button type="button" onClick={() => addOption(qIndex)}>Add Option</Button>
                )}
                <DeleteButton type="button" onClick={() => deleteQuestion(qIndex)}>Delete Question</DeleteButton>
                <DuplicateButton type="button" onClick={() => duplicateQuestion(qIndex)}>Duplicate</DuplicateButton>
              </QuestionContainer>
            ))}
            <Button type="button" onClick={addQuestion}>+ Add Question</Button>
            <ButtonContainer>
              <Button type="submit">Submit Form</Button>
              <Button type="button" onClick={handleSave}>Save</Button>
              <Button type="button" onClick={handleClear}>Clear</Button>
            </ButtonContainer>
          </form>
        )}
      </Container>
    </>
  );
};

export default FormComponent;
