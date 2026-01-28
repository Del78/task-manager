export default function FormButton({ isLoading, loadingText, defaultText, isDisabled }) {
  return (
    <button type="submit" disabled={isLoading || isDisabled}>
      {isLoading ? loadingText : defaultText}
    </button>
  );
}
