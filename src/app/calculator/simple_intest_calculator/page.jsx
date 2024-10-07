"use client";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pie_Chart from "@/components/charts/pieChart";
import useFrequencyValues from "@/hooks/investmentTime";
import formatNumberInNepali from "@/utils/formattedNumber";
function SimpleIntCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [annualReturnRate, setAnnualReturnRate] = useState(6); // in percentage
  const [investmentDuration, setInvestmentDuration] = useState(1); // in years
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // SIP Calculation function based on frequency
  const calculateSimpleInterest = () => {
    const principal = investmentAmount; // Initial investment amount
    const rate = annualReturnRate; // Annual interest rate (percentage)
    const time = investmentDuration; // Investment duration in years

    // Simple Interest formula: SI = (P * R * T) / 100
    const simpleInterest = (principal * rate * time) / 100;

    // Future Value (total value) = Principal + Simple Interest
    const futureValue = principal + simpleInterest;

    // In simple interest, total invested is the principal amount
    const totalInvested = principal;
    const returns = futureValue - totalInvested;

    setTotalInvestment(totalInvested.toFixed(0));
    setEstimatedReturns(returns.toFixed(0));
    setTotalValue(futureValue.toFixed(0));
  };

  // Recalculate SIP when any slider or dropdown changes
  useEffect(() => {
    calculateSimpleInterest();
  }, [
    investmentAmount,
    annualReturnRate,
    investmentDuration,
    investmentFrequency,
  ]);

  // Pie chart data
  const data = [
    { name: "Total Investment", value: parseFloat(totalInvestment) },
    { name: "Estimated Returns", value: parseFloat(estimatedReturns) },
  ];

  const hasData = totalInvestment > 0 || estimatedReturns > 0;
  const getSliderPercentage = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };
  return (
    <div className="grid place-content-center w-full">
      <div className="flex flex-col gap-4">
        <Breadcrumb className="mt-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Simple Interest Calculator</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="md:text-4xl font-semibold">
          Simple Interest Calculator
        </h1>
        <div className="flex rounded-lg border justify-between md:w-[1000px] w-full md:flex-nowrap flex-wrap">
          <div className="flex flex-col w-full md:gap-8 gap-4 p-2">
            {/* Investment Amount */}
            <div className="mb-4 space-y-3">
              <label className="text-gray-700 flex w-full justify-between items-center">
                <p className="md:text-lg text-[12px]">Investment Amount (Rs)</p>
                <div className="text-sm bg-[#00C49F] px-1 py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                  <span>Rs</span>
                  <input
                    className={`md:text-lg text-sm outline-none w-24 text-right ${
                      investmentAmount < 0 ? "bg-red-500" : "bg-[#00C49F]"
                    }`}
                    value={investmentAmount === 0 ? "" : investmentAmount} // Allow clearing input
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty input
                      if (value === "") {
                        setInvestmentAmount(0);
                        return;
                      } else if (value > 1000000) {
                        setInvestmentAmount(1000000);
                      } else {
                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                          setInvestmentAmount(parsedValue);
                        }
                      }
                    }}
                  />
                </div>
              </label>
              <input
                type="range"
                min="500"
                max="1000000"
                step="500"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full range-slider"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    investmentAmount,
                    500,
                    1000000
                  )}%, #e2e8f0 ${getSliderPercentage(
                    investmentAmount,
                    500,
                    1000000
                  )}%)`,
                }}
              />
            </div>

            {/* Expected Return Rate */}
            <div className="mb-4 space-y-3">
              <label className="text-gray-700 flex w-full justify-between">
                <p className="md:text-lg text-[12px]">
                  Expected Return Rate (p.a)
                </p>
                <div className="text-sm bg-[#00C49F] px-2.5 py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                  <input
                    className={`md:text-lg text-sm outline-none w-24 text-right ${
                      annualReturnRate < 0 ? "bg-red-500" : "bg-[#00C49F]"
                    }`}
                    value={annualReturnRate === 0 ? "" : annualReturnRate} // Allow clearing input
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow empty input
                      if (value === "") {
                        setAnnualReturnRate(0); // or set to a default value if needed
                        return;
                      }

                      const parsedValue = parseFloat(value);
                      if (!isNaN(parsedValue)) {
                        if (parsedValue < 1) {
                          setAnnualReturnRate(0);
                        } else if (parsedValue > 30) {
                          setAnnualReturnRate(30);
                        } else {
                          setAnnualReturnRate(parsedValue);
                        }
                      }
                    }}
                  />
                  <span>%</span>
                </div>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={annualReturnRate}
                onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                className="mt-1 w-full outline-none"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    30
                  )}%, #e2e8f0 ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    30
                  )}%)`,
                }}
              />
            </div>

            {/* Investment Duration */}
            <div className="mb-4 space-y-3">
              <label className="text-gray-700 flex w-full justify-between">
                <p className="md:text-lg text-[12px]">
                  Investment Duration (Years)
                </p>
                <div className="text-sm bg-[#00C49F]  py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                  <input
                    className={`md:text-lg text-sm outline-none w-24 text-right ${
                      investmentDuration < 0 ? "bg-red-500" : "bg-[#00C49F]"
                    }`}
                    value={investmentDuration === 0 ? "" : investmentDuration} // Allow clearing input
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty input
                      if (value === "") {
                        setInvestmentDuration(0);
                        return;
                      } else if (value > 40) {
                        setInvestmentDuration(40);
                      } else {
                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                          setInvestmentDuration(parsedValue);
                        }
                      }
                    }}
                  />
                  <span>Yrs</span>
                </div>
              </label>
              <input
                type="range"
                min="1"
                max="40"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                className="mt-1 w-full outline-none"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    investmentDuration,
                    1,
                    40
                  )}%, #e2e8f0 ${getSliderPercentage(
                    investmentDuration,
                    1,
                    40
                  )}%)`,
                }}
              />
            </div>

            {/* Results */}
            <div className="w-full bg-white">
              <h2 className="md:text-lg text-sm font-semibold">Results</h2>
              <div className="mt-1.5 md:text-lg text-sm flex flex-col gap-2">
                <div className="flex w-full justify-between">
                  <p>Total Investment:</p>
                  <p className="text-[#0088FE]">
                    Rs {formatNumberInNepali(totalInvestment)}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <p>Estimated Returns:</p>
                  <p className="text-[#00C49F]">
                    Rs {formatNumberInNepali(estimatedReturns)}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <p>Total Value:</p>
                  <p className="text-purple-700">
                    Rs {formatNumberInNepali(totalValue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-full md:h-96 h-80 flex justify-center">
            {hasData ? (
              <Pie_Chart data={data} COLORS={COLORS} cy={210} height={400} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleIntCalculator;
