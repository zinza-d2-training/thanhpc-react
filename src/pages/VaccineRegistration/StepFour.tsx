interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
}
export const StepFour = (props: Props) => {
  const { onNextStep, onPrevStep } = props;
  return (
    <>
      <h1>hello 3</h1>
    </>
  );
};
