import { Switch } from './path/to/switch';

function QuestionItem({ question, onChange }) {
  return (
    <div>
      <p>{question.text}</p>
      <Switch
        checked={question.answer === 'Yes'}
        onCheckedChange={(checked) => {
          onChange({
            ...question,
            answer: checked ? 'Yes' : 'No'
          });
        }}
      />
      <span>{question.answer}</span>
    </div>
  );
}