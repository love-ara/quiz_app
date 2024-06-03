import {ErrorMessage, Field, Form} from "formik";
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import React from "react";
import {Styles} from "../styles/Styles";
export function Username(props: { submitting: boolean, loading: boolean }) {
    return <Form>
        <div style={{marginBottom: "10px"}}>
            <Field
                type="text"
                name="username"
                placeholder="Username"
                autoFocus={true}
                required={true}
                style={Styles.input}
            />
            <ErrorMessage name="username" component="div" style={Styles.errorMessage}/>
        </div>
        <div>
            <button
                type="submit"
                style={Styles.button}
                disabled={props.submitting || props.loading}
            >
                {props.loading ? <Icon icon={loadingLoop} width="24"/> : "Submit"}
            </button>
        </div>
    </Form>;
}