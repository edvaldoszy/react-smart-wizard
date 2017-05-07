# react-smart-wizard
Smart Wizard for React

## Installation
```
npm install --save react-smart-wizard
```

## Usage
```
import ReactSmartWizard, { ReactSmartWizardStep } from "react-smart-wizard";

<ReactSmartWizard
    cycleSteps={false}
    beforeStepChange={(index) => {
        // do something here before step change and return true
        return true;
    }}
    afterStepChange={(index) => {
        // do something here after step change
    }}>
    <ReactSmartWizardStep
        title="Step title 1">
        <h1>Step 1 content</h1>
    </ReactSmartWizardStep>
    <ReactSmartWizardStep
        title="Step title 2">
        <h1>Step 2 content</h1>
    </ReactSmartWizardStep>
    <ReactSmartWizardStep
        title="Step title 3">
        <h1>Step 3 content</h1>
    </ReactSmartWizardStep>
</ReactSmartWizard>
```
