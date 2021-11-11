import React, {FC, ReactElement} from 'react';
import { DappInputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappInputHeader } from './DappInputHeader';
import { DappInputContent } from './DappInputContent';
import { darkenStandard } from '../Methods';

export type DappPutInputProps = {
    style ? : React.CSSProperties
    dappInput : DappInputI,
    setInput ? : (input : DappInputI)=>void,
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (contractFunction : OpenContractFunctionI)=>void
}

export const DappInput : FC<DappPutInputProps>  = ({
    dappInput,
    style,
    setInput
}) =>{

    return (

        <></>
    )

}