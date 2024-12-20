"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./Social";



interface CardWrapperProps {
    children?: React.ReactNode;
    headerLabel: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
children,
headerLabel,
showSocial,
}: CardWrapperProps)=>{

    return(
        <Card className="w-[400px] shadow-md">

            <CardHeader>
                <Header
                label={headerLabel}
                />
            </CardHeader>
            <CardContent>
           {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
           
        </Card>
    )
}