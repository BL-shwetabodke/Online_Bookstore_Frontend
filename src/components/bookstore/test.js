import React, {Fragment} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from "@material-ui/core/Box";

export default class Variants extends React.Component  {
    render() {
        return (
            <Box height={125} width={235}>
                <Box style={{margin: "10px auto"}} height={125} width={235}>
                    <Skeleton style={{margin: "10px auto"}} variant={"rect"} height={135} width={235} animation={"wave"}>
                    <Box style={{margin: "10px auto"}} height={125} width={235}>
                        <Skeleton style={{margin: "10px auto"}} variant={"rect"} height={130} width={100} animation={"wave"}/>
                    </Box>
                    </Skeleton>
                </Box>
                <Box height={125} width={235}>
                    <Skeleton height={20} width={100} variant={"text"} animation={"wave"}/>
                    <Skeleton height={20} width={100}  variant={"text"} animation={"wave"}/>
                    <Skeleton height={20} width={100}  variant={"text"} animation={"wave"}/>
                    <Skeleton style={{margin: "5px auto"}} height={35} width={130} variant={"text"} animation={"wave"}/>
                </Box>
            </Box>
        )
    };
}