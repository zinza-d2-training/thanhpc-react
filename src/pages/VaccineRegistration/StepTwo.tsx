interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
}
export const StepTwo = (props: Props) => {
  const { onNextStep, onPrevStep } = props;
  return (
    <>
      <h1>hello 2</h1>
    </>
  );
};
