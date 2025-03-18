import { useState } from "react"
import { BounceLoader } from "react-spinners";

const useLoading = (loading: boolean = false): [JSX.Element, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isLoading, setIsLoading] = useState(loading);
    const element: JSX.Element = isLoading
        ? <div className="fixed left-0 right-0 bottom-0 top-0 z-[2] flex items-center justify-center bg-neutral-600/60">
            <BounceLoader
                color="#5e2a82"
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        : <></>;
    
    return [element, setIsLoading];
}

export default useLoading;