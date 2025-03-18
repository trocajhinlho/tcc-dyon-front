import { useState } from "react";

import logoDyon from "../../assets/logos/logo_text.svg";
import vectorTop from "../../assets/vetores-bg/vetor-cadastro-1.svg";
import vectorBottom from "../../assets/vetores-bg/vetor-cadastro-2.svg";
import { BasicDataStep } from "../../components/register-steps/Instituicao/BasicDataStep";
import { FavoriteDataStep } from "../../components/register-steps/Instituicao/FavoriteDataStep";
import { FinalStep } from "../../components/register-steps/Instituicao/FinalStep";
import { LocationDataStep } from "../../components/register-steps/Instituicao/LocationDataStep";
import { OrganizationBasicStepFormData, LocationStepFormData } from "../../types/types";


export function CadastroInstituicao() {

    const getBasicDataStep = (basicData: OrganizationBasicStepFormData) => {
        setBasicData(basicData);
        stepManager.next()
    }

    const getLocationDataStep = (LocationData: LocationStepFormData) => {
        setLocationData(LocationData);
        stepManager.next()
    }

    const stepManager = {
        next: function () {
            if (currentStep < steps.length - 1)
                setCurrentStep(currentStep + 1);
        },
        prev: function () {
            if (currentStep > 0)
                setCurrentStep(currentStep - 1);
        }
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [basicData, setBasicData] = useState<OrganizationBasicStepFormData>();
    const [locationData, setLocationData] = useState<LocationStepFormData>();
    
    const steps = [
        <BasicDataStep data={basicData!} getData={getBasicDataStep} />,
        <LocationDataStep getData={getLocationDataStep} prev={stepManager.prev}/>,
        <FavoriteDataStep prev={stepManager.prev} locationData={locationData} basicData={basicData} nextStep={stepManager.next}/>,
        <FinalStep />
    ];
    const finishedRegistration = currentStep == steps.length - 1;

    return (
        
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#eee] py-2 px-4">
            <div className="fixed top-0 left-0 right-0">
                <img src={vectorTop} className="w-screen" />
            </div>
            <img src={logoDyon} alt="logo do dyon" className="fixed bottom-10 right-10 z-[1]" />
            {/* Main */}
            <main className="z-[2] relative h-full sm:h-auto">
                <div className="bg-white p-8 rounded-xl shadow-xl max-w-[800px] h-full sm:h-auto flex flex-col justify-between sm:block">
                    {steps[currentStep]}
                </div>
                {
                    !finishedRegistration &&
                    <span className="mt-5 font-semibold text-xl text-[#29274C] text-center hidden sm:block select-none">
                        Etapa {currentStep + 1}/{steps.length - 1}
                    </span>
                }
            </main>

            <div className="fixed bottom-0 left-0 right-0">
                <img src={vectorBottom} className="w-screen" />
            </div>
        </div>

    )
}