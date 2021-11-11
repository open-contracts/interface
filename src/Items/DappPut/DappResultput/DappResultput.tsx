import React, {FC, ReactElement} from 'react';
import { DappResultputI } from '../DappPutType';
import { DappPutLayout } from '../DappPutLayout';
import {Colors} from "../../../Theme/Colors";
import { DappResultputHeader } from './DappResultputHeader';
import { DappResultputContent } from './DappResultputContent';
import { darkenStandard } from '../Methods';
import { DesktopSizes } from '../../../Theme';

export type DappPutResultputProps = {
    style ? : React.CSSProperties
    dappResultput : DappResultputI,
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (contractFunction : OpenContractFunctionI)=>void
}

export const DappResultput : FC<DappPutResultputProps>  = ({
    dappResultput,
    style,
}) =>{

    return (

        <DappPutLayout style={{
            background : Colors.greenCeramic,
            color : Colors.forestEdge,
            borderTop : `1px solid ${Colors.forestEdge}`,
            border : `1px solid ${Colors.forestEdge}`,
            borderRadius : DesktopSizes.BorderRadius.standard,
            ...style
        }}>
            <DappPutLayout.Header>
                <DappResultputHeader dappResultput={dappResultput} />
            </DappPutLayout.Header>
            <DappPutLayout.Content>
                <DappResultputContent dappResultput={dappResultput}/>
            </DappPutLayout.Content>
        </DappPutLayout>

    )

}