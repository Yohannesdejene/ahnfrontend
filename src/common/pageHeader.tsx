import React from "react";
import { Typography, Stack, ButtonGroup, Button } from "@mui/material";
import { Button as BaseButton } from "@mui/base/Button";
import Link from "next/link";
// Define the types for props
interface PageHeaderProps {
  title: string;
  url: string;
  btnLabel: string;
  showButton: boolean;
}
// Define the types for props
interface PageHeader2Props {
  title: string;
  btnLabel: string;
  headerFunction: () => void;
  showButton: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  url,
  btnLabel,
  showButton,
}) => {
  return (
    <div className="mb-9 ml-10 mr-5 flex items-center justify-between">
      <label className="mb-2 block  text-title-md font-medium text-black dark:text-white">
        {title}
      </label>
      {showButton && (
        <ButtonGroup
          variant="outlined"
          aria-label="text button group"
          sx={{ textTransform: "lowercase" }}
        >
          <Link
            href={url}
            className="font-sans cursor-pointer rounded-lg border border-solid border-primary bg-primary px-4 py-2 text-sm leading-normal text-white"
          >
            {btnLabel}
          </Link>
        </ButtonGroup>
      )}
    </div>
  );
};

export const PageHeader2: React.FC<PageHeader2Props> = ({
  title,
  btnLabel,
  headerFunction,
  showButton,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      mb={5}
      sx={{ justifyContent: "space-between" }}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {showButton && (
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "lowercase" }}
            onClick={headerFunction}
          >
            {btnLabel}
          </Button>
        </ButtonGroup>
      )}
    </Stack>
  );
};
