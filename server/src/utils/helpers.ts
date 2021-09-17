import * as moment from "moment";
import "moment-duration-format";

export const formatDuration = (duration: string) => {
  return moment.duration(duration).format("h:mm:ss").padStart(4, "0:0");
};
