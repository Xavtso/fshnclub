import { useDispatch, useSelector } from "react-redux"
import { userSliceActions } from "../utils/slices/user-slice";

export default function Notification() {
    const dispatch = useDispatch();
    const {message} = useSelector(state =>  state.user)

    function handleClose() {
        dispatch(userSliceActions.closeMessage())
    }


    return (
        <div className="message">
            <p className="messageContent">{message}</p>
            <span id="close" onClick = {handleClose}>
                &times;
            </span>
        </div>
    )
}