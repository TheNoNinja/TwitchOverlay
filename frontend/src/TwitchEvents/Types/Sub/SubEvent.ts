import type {SubMessageInfo} from "./SubMessageInfo";
import type {SubDetail} from "./SubDetail";
import type {SubGiftDetail} from "./SubGiftDetail";

export type SubEvent = SubMessageInfo & (SubDetail | SubGiftDetail);