import * as moment from "moment";
import "moment-duration-format";

export const formatDuration = (duration: string) => {
  let formatedDuration = moment.duration(duration).format("h:mm:ss").padStart(4, "0:0");
  if (formatedDuration === "0:00") {
    formatedDuration = "live";
  }
  return formatedDuration;
};
