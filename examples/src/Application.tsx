import * as React from "react";
import { render } from "react-dom";

import ReactSmartWizard, { ReactSmartWizardStep } from "react-smart-wizard";

class Application extends React.Component<undefined, undefined> {

    beforeStepChange(index) {
        if (index == 1) {
            console.log("Trava e não deixa passar da step 3");
            return false;
        } else {
            return true;
        }
    }

    afterStepChange(index) {
        console.log("Executado depois que a etapda " + index + " foi carregada");
    }

    render() {
        return (
            <ReactSmartWizard
                cycleSteps={false}
                beforeStepChange={this.beforeStepChange.bind(this)}
                afterStepChange={this.afterStepChange.bind(this)}>
                <ReactSmartWizardStep
                    title="Meu titulo 1">
                    <h1>Conteúdo da step 1</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    title="Meu titulo 2">
                    <h1>Conteúdo da step 2</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    title="Meu titulo 3">
                    <h1>Conteúdo da step 3</h1>
                </ReactSmartWizardStep>
            </ReactSmartWizard>
        );
    }
}

render(<Application />, document.getElementById("application"));
