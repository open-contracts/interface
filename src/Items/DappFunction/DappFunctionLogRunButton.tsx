import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { Play, PlayCircleFill, PlayFill } from 'react-bootstrap-icons';
import { AthenaButton } from '../../Components/Buttons';
import { Colors, DesktopSizes, Shadows } from '../../Theme';
import { DappInputHeader } from '../DappPut/DappInput/DappInputHeader';
import { DappResultput } from '../DappPut/DappResultput';
import { ArrowReturnRight } from 'react-bootstrap-icons';
import { TextInputApollo } from '../../Components/TextInput';
import * as pure from "./StateMethods";
import {generate} from "shortid";
import { DefaultHeader } from '../DappPut/Standards';
import { text } from 'stream/consumers';


export type DappFunctionLogRunButtonProps = {
    contractFunction : OpenContractFunctionI,
    reduceContractFunction : (contractFunction : pure.reduceContractFunctionI)=>void,
}

export const DappFunctionLogRunButton : FC<DappFunctionLogRunButtonProps>  = ({
    contractFunction,
    reduceContractFunction
}) =>{


    const inputs = pure.createInputs(
        contractFunction,
        reduceContractFunction
    ).map((input, index)=>{

        const onTextInput = (text : string)=>{

            reduceContractFunction((contractFunction)=>{
                
                const newInput =  {
                    ...contractFunction.inputs[index],
                    value : text
                };
                return {
                    ...contractFunction,
                    inputs : [
                        ...contractFunction.inputs.slice(0, index),
                        newInput,
                        ...contractFunction.inputs.slice(index + 1)
                    ]
                }
            });
        }

        

        return (
                    <div 
                    key={`${index}-${input.name}`}
                    style={{
                        alignContent : 'center',
                        alignItems : "center",
                        paddingBottom : DesktopSizes.Padding.standard,
                        lineHeight : "18px"
                    }}>
                        <DappInputHeader dappInput={input} style={{
                            fontSize : "16px",
                        }}/>
                        <br/>
                        <div style={{
                            display : "flex",
                            color : Colors.secondaryTextColor,
                            alignContent : "center",
                            alignItems : "center",
                            fontSize : "16px"
                        }}>
                           &emsp;<span style={{
                               fontSize : "16px"
                           }}>=&emsp;</span><TextInputApollo
                            value={input.value||""}
                            onTextInput={onTextInput}
                            style={{
                                fontSize : "16px"
                           }}/>
                        </div>
                    </div>
                )
         
    });

    return (
             <div style={{
                position : "relative",
            }}>
                <div
                    style={{
                        width : "100%",
                        borderTopLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderTopRightRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                        borderBottomRightRadius : DesktopSizes.BorderRadius.standard,
                        background : 'white',
                        boxShadow : Shadows.defaultShadow,
                        padding :  "20px"
                    }}>
                    <div style={{
                        color : Colors.Maintheme
                    }}>
                        <DefaultHeader dappPut={{
                            name : "Inputs",
                            putType : "Inputs",
                            value : "any",
                            contractFunction : {} as OpenContractFunctionI,
                            reduceContractFunction : ()=>{} 
                        }}>
                            <DefaultHeader.Pre>
                            𝑥
                            </DefaultHeader.Pre>
                        </DefaultHeader>
                        <div style={{
                            paddingLeft : DesktopSizes.Padding.whitespacePreferred
                        }}>
                            {inputs}
                        </div>
                    </div>
                </div>
            </div>
       
      

    )

}