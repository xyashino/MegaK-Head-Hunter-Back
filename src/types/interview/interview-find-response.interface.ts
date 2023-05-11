import { InterviewResponse } from './interview-response.interface';
import {PageMeta} from "../pagination";

export interface InterviewFindResponse {
  data: InterviewResponse[];
  meta: PageMeta;
}
