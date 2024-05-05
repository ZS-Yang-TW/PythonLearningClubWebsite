import React, { FC } from 'react';
import { Button } from '@mui/material';

type PageButtonProps = {
    url: string;
    text: string;
}

export const PageButton:FC<PageButtonProps> = ({url, text}) => {
    return (
        <a href={url} target='_blank' rel='noreferrer'>
            <Button 
            variant="contained" 
            sx={{
                fontWeight: "bold",
                backgroundColor: "#FFF", // 自定義背景顏色
                color: "#111", // 文字顏色
                '&:hover': {
                backgroundColor: "#FCFAB6", // 滑鼠懸停時的背景顏色
                }
            }}>
            {text}
            </Button>
        </a>
    )
}