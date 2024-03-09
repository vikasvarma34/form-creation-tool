import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Arial, sans-serif;
    background-color: #f2f2f7;
  }
`;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  background-color: #fff;
  padding: 20px 0;
  box-shadow: 0 1px 0 0 #d1d1d6;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  z-index: 1000;
  top: 0;
`;

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 120px auto 20px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  margin: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005ecb;
  }
`;

export const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #c7c7cc;
  border-radius: 8px;
  width: calc(100% - 24px);
  display: block;
  background-color: white; 
`;

export const Select = styled.select`
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #c7c7cc;
  border-radius: 8px;
  width: 100%;
  display: block;
  background-color: white; 
`;

export const QuestionContainer = styled.div`
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
  background-color: ${({ alt }) => (alt ? '#ebebed' : '#d9e3fc')}; 
`;

export const OptionContainer = styled.div`
  margin-bottom: 10px;
`;

export const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  margin-right: 10px; /* Adjusted for alignment */
  font-weight: bold;
`;

export const SubHeading = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: ${({ question }) => (question ? '18px' : '16px')};
`;

export const TrashIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 10px;
  color: #ff3b30; 
`;

export const DuplicateButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #388e3c;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #f74c43; 
  color: white; 
  &:hover {
    background-color: #d9534f; 
  }
`;
