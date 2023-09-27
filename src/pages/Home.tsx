import { FC } from "react"
import { Header } from "../components/Header/Header"
import { Banner } from "../components/Banner/Banner"

export const Home: FC = () =>{
    return (
        <>
            <Header />
            <Banner />
        </>
    )
}