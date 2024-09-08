"use client";
import React from "react";
import ProviderWrapper from "../lib/ProviderWrapper";
import ReportPanel from "./ReportPanel";
import { Campaign } from "../types";

type Props = {
    data: Campaign[];
};

const RootContainer = ({
    data,
}: Props) => {
  return (
    <ProviderWrapper>
      <ReportPanel data={data} />
    </ProviderWrapper>
  );
};

export default RootContainer;
