import { toast, TypeOptions } from "react-toastify";

export function print(_message: String, _type: TypeOptions) {
  toast(_message, {
    type: _type,
    position: "bottom-right",
  });
}
