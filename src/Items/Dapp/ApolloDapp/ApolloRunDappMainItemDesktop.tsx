import React, {FC, ReactElement, useEffect, useState} from 'react';
import { DappI, getDappName,  getDappContract } from '../Dapp';
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Colors, DesktopSizes } from '../../../Theme';
import {ApolloRunDappContent} from "./ApolloRunDappContent";
import { ApolloRunDappFunctionGridView } from './ApolloRunDappFunctionGridView';
import { ApolloRunDappFunctionView } from './ApolloRunDappFunctionView';
import { useErrorContext } from '../../../Error/ErrorProvider';
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';


export type ApolloRunDappMainItemReadmeProps = {
    style ? : React.CSSProperties,
    readme : string | undefined
}

export const ApolloRunDappMainItemReadMe : FC<ApolloRunDappMainItemReadmeProps> = ({
    style,
    readme
})=>{

    return (
        <div style={{
            ...style,
            textAlign : 'left'
        }}>
            {!readme && <Skeleton width="100%" count={5}/>}
            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                {readme}    
            </ReactMarkdown>}
        </div>
    )

}

export type ApolloRunDappMainItemInternalsProps = {
    dappItem : DappI,
    setDappItem ? : (dappItem : DappI)=>void,
    style? : React.CSSProperties,
    key? : React.Key,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappMainItemInternals : FC<ApolloRunDappMainItemInternalsProps>  = ({
    dappItem,
    style,
    setDappItem,
    grid,
    setGrid, 
    which,
    setWhich
}) =>{

    const _selectedFunc = dappItem.contract && dappItem.contract.contractFunctions ? 
                            dappItem.contract.contractFunctions.filter((func)=>{
                                return func.name === which
                            })[0] : undefined

    const selectedFunc = _selectedFunc || (
        dappItem.contract?.contractFunctions[0]
    )

    const setFunc = (contractFunction : OpenContractFunctionI)=>{

        

        if(dappItem.contract && setDappItem){

            const newContractFunctions = dappItem.contract.contractFunctions.reduce((agg, oldContractFunction)=>{

                return [
                    ...agg,
                    ...(contractFunction.name === oldContractFunction.name) ? [contractFunction] : [oldContractFunction]
                ]
            }, [] as OpenContractFunctionI[])

            setDappItem({
                ...dappItem,
                contract : {
                    ...dappItem.contract,
                    contractFunctions : newContractFunctions
                }
            })

        }

    }

    const handleWhich = (which : string)=>{
        setGrid && setGrid(false);
        setWhich && setWhich(which);
    }

    return (

        <div style={{
            width : "100%",
            // paddingBottom : DesktopSizes.Padding.whitespacePreferred,
            ...style
        }}>
            <div>
                <div style={{
                    textAlign : "left",
                    color : Colors.Maintheme
                }}>
                    <h1>{dappItem.contract ? dappItem.contract.contractName : ""}</h1>
                    <p>{dappItem.contract ? dappItem.contract.contractDescription : ""}</p>
                </div>
                <div>
                    <ApolloRunDappMainItemActions
                        dapp={dappItem}
                        gitUrl={dappItem.gitUrl}
                    />
                </div>
                <ApolloRunDappContent 
                    which={selectedFunc ? selectedFunc.name : ""}
                    grid={grid} setGrid={setGrid}>
                    <ApolloRunDappContent.Grid>
                        <ApolloRunDappFunctionGridView
                            dapp={dappItem}
                            setWhich={handleWhich}
                            which={which}
                        />
                    </ApolloRunDappContent.Grid>
                    <ApolloRunDappContent.Single>
                        <ApolloRunDappFunctionView
                            dapp={dappItem}
                            setDappFunction={setFunc}
                            contractFunction={selectedFunc}
                        />
                    </ApolloRunDappContent.Single>
                </ApolloRunDappContent>
            </div>
        </div>

    )

}

export type ApolloRunDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappMainItemDesktop : FC<ApolloRunDappMainItemProps>  = ({
    dappItem,
    style,
    updateDapp,
    grid,
    setGrid,
    setWhich,
    which
}) =>{

   

    return (

        <ApolloRunDappMainItemInternals 
            setWhich={setWhich}
            which={which}
            grid={grid}
            setGrid={setGrid}
            setDappItem={updateDapp} dappItem={dappItem} style={style}/>

    )

}