import { ReactNode } from "react"

type Props = {
    children?: ReactNode
};

export function Main(props: Props) {
    return (
        <div className="min-h-screen pt-24 pb-16 px-2 my-0 mx-auto container">
            {props.children}
        </div>
    )
}