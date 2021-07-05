import {MessageInfo} from "../Messages/MessageInfo";
import {SubDetail} from "./SubDetail";
import {SubGiftDetail} from "./SubGiftDetail";

export type SubEvent = MessageInfo & (SubDetail | SubGiftDetail)