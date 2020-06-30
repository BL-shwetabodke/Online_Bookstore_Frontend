import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import {Box} from "@material-ui/core";


export default class HomepagePlaceHolder extends React.Component {
    render() {
        return (
            <Skeleton style={{borderRadius: "6px", width: "98%", height: "fit-content"}} variant={"rect"}
                      animation={"wave"}>
                <Skeleton style={{width: "100%", height: "50%"}} variant={"rect"} animation={"wave"}>
                    <Box style={{margin: "10px auto", width: "60%", height: "135px"}}>
                        <Skeleton style={{margin: "10px auto", width: "60%", height: "135px"}} variant={"rect"}
                                  animation={"wave"}/>
                    </Box>
                </Skeleton>
                <Box height={130} width={235}>
                    <Box style={{marginTop:"20px",display:"flex",justifyContent: "space-between", margin: "auto", width: "100%", height: "30px"}}>
                        <Skeleton style={{marginLeft: "10px"}} height={30} width={120} variant={"text"}
                                  animation={"wave"}/>
                        <Skeleton style={{marginTop:"3px"}} height={30} width={30} variant={"circle"}
                                  animation={"wave"}/>
                    </Box>
                    <Skeleton style={{marginLeft: "10px"}} height={30} width={100} variant={"text"} animation={"wave"}/>
                    <Skeleton style={{marginLeft: "10px"}} height={30} width={80} variant={"text"} animation={"wave"}/>
                    <Skeleton style={{margin: "auto",borderRadius:"6px"}} height={40} width={130} variant={"text"} animation={"wave"}/>
                </Box>
            </Skeleton>
        )
    };
}
