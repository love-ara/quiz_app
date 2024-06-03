import {ErrorMessage, Field, Form} from "formik";
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import React from "react";
import {Styles} from "../styles/Styles";

export function QuizPin(props: { submitting: boolean, loading: boolean }) {
    return <Form>
        <div style={{marginBottom: "10px"}}>
            <Field
                type="text"
                name="quizPin"
                placeholder="Quiz Pin"
                autoFocus={true}
                required={true}
                style={Styles.input}
            />
            <ErrorMessage name="quizPin" component="div" style={Styles.errorMessage}/>
        </div>
        <div>
            <button
                type="submit"
                style={Styles.button}
                disabled={props.submitting || props.loading}
            >
                {props.loading ? <Icon icon={loadingLoop} width="24"/> : "Enter"}
            </button>
        </div>
    </Form>;
}