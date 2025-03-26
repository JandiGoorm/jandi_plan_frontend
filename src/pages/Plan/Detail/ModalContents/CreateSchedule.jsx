import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createScheduleScheme } from "../../constants";
import { usePlanDetail } from "../PlanDetailContext";
import ScheduleDetail from "./ScheduleDetail";
import SchedulePlace from "./SchedulePlace";

const CreateSchedule = ({ focusDay }) => {
  const [isAddressStep, setIsAddressStep] = useState(false);
  const { addItinerary } = usePlanDetail();

  const formController = useForm({
    resolver: zodResolver(createScheduleScheme),
  });

  const { handleSubmit, setValue } = formController;

  const onSubmit = useCallback(
    (data) => {
      addItinerary(data);
      //form초기화
      formController.reset();
    },
    [addItinerary, formController]
  );

  const handleAddressStep = useCallback(() => {
    setIsAddressStep(true);
  }, []);

  const handleScheduleStep = useCallback(() => {
    setIsAddressStep(false);
  }, []);

  return (
    <>
      {isAddressStep ? (
        <SchedulePlace
          formController={formController}
          setPlace={setValue}
          handleScheduleStep={handleScheduleStep}
        />
      ) : (
        <ScheduleDetail
          formController={formController}
          onSubmit={handleSubmit(onSubmit)}
          handleAddressStep={handleAddressStep}
          focusDay={focusDay}
        />
      )}
    </>
  );
};

export default CreateSchedule;
