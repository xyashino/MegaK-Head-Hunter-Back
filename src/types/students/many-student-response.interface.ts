import {ActiveStudentResponse} from "./active-student-response.interface";
import {PageMeta} from "../pagination";


export interface ManyStudentResponse {
  data: ActiveStudentResponse[],
  meta: PageMeta,
}
