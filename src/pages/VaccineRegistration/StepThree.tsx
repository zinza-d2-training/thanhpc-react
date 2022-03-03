interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
}
export const StepThree = (props: Props) => {
  const { onNextStep, onPrevStep } = props;
  return (
    <>
      <h1>hello 3</h1>
    </>
  );
};
