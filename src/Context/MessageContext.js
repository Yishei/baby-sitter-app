import { createContext } from "react";
import { message } from "antd";

export const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const successMsg = (msg) => {
        messageApi.open({
            type: "success",
            content: msg,
            duration: 2,
        });
    };

    const errorMsg = (msg) => {
        messageApi.open({
            type: "error",
            content: msg,
            duration: 2,
        });
    };

    const warningMsg = (msg) => {
        messageApi.open({
            type: "warning",
            content: msg,
            duration: 2,
        });
    };

    const loadingMsg = (msg) => {
        messageApi.open({
            type: "loading",
            content: msg,
            duration: 0,
        });
    };



    const values = {
        messageApi,
        contextHolder,
        successMsg,
        errorMsg,
        warningMsg,
        loadingMsg,
    };
    
    return <MessageContext.Provider value={values}>{children}</MessageContext.Provider>;
    }


export default MessageContext;