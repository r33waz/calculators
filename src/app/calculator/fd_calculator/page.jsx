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

function FD_calculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [annualReturnRate, setAnnualReturnRate] = useState(4); // in percentage
  const [investmentDuration, setInvestmentDuration] = useState(1); // in years
  const [investmentFrequency, setInvestmentFrequency] = useState("quarterly");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const { periodsPerYear } = useFrequencyValues(investmentFrequency);

  // FD Calculation function based on frequency

  const calculateFD = () => {
    const principal = investmentAmount; // Initial investment amount
    const rate = annualReturnRate / 100; // Convert percentage to decimal
    const n = periodsPerYear; // Compounding frequency
    const t = investmentDuration;

    // Future Value calculation using the compound interest formula
    const futureValue = principal * Math.pow(1 + rate / n, n * t);

    const totalInvested = principal; // Total invested remains the principal for FD
    const returns = futureValue - totalInvested;

    setTotalInvestment(totalInvested.toFixed(0));
    setEstimatedReturns(returns.toFixed(0));
    setTotalValue(futureValue.toFixed(0));
  };

  // Recalculate FD when any slider or dropdown changes
  useEffect(() => {
    calculateFD();
  }, [
    investmentAmount,
    annualReturnRate,
    investmentDuration,
    investmentFrequency,
    periodsPerYear,
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
              <BreadcrumbPage>Fixed Deposit Calculators</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Fixed Deposit Calculator</h1>
        <div className="flex rounded-lg  justify-between md:w-[1000px] w-full md:flex-nowrap flex-wrap">
          <div className="flex flex-col w-full md:gap-8 gap-4 p-2">
            {/* Investment Frequency */}
            <div className="mb-4 space-y-3 flex flex-col">
              <label className="md:text-lg text-[12px]">
                Investment Frequency
              </label>
              <select
                value={investmentFrequency}
                onChange={(e) => setInvestmentFrequency(e.target.value)}
                className="md:text-lg text-[12px] py-2"
              >
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Annually</option>
                <option value="half-yearly">Semi-Annually</option>
              </select>
            </div>

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
                      } else if (value > 10000000) {
                        setInvestmentAmount(10000000);
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
                min="1000"
                max="10000000"
                step="1000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full range-slider"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    investmentAmount,
                    500,
                    10000000
                  )}%, #e2e8f0 ${getSliderPercentage(
                    investmentAmount,
                    500,
                    10000000
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
                        } else if (parsedValue > 15) {
                          setAnnualReturnRate(15);
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
                max="15"
                value={annualReturnRate}
                onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                className="mt-1 w-full outline-none"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    15
                  )}%, #e2e8f0 ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    15
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
      <div className="max-w-4xl mt-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          What is a Fixed Deposit (FD)?
        </h1>

        {/* FD Explanation */}
        <section className="mb-8">
          <p className="text-sm md:text-base leading-6 text-gray-700">
            A <strong>Fixed Deposit (FD)</strong> is a financial instrument
            offered by banks and non-banking financial companies (NBFCs) that
            provides investors with a higher rate of interest than a regular
            savings account, until the maturity date. The investor deposits a
            lump sum amount for a fixed tenure, and the bank pays interest on
            the amount at a predetermined rate.
          </p>
        </section>

        {/* How Does FD Work */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How Does Fixed Deposit Work?
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-gray-700">
            <li>
              <strong>Deposit Amount:</strong> You invest a lump sum amount in
              the fixed deposit.
            </li>
            <li>
              <strong>Tenure:</strong> You choose a fixed tenure, which can
              range from a few days to several years.
            </li>
            <li>
              <strong>Interest Rate:</strong> The bank offers a fixed interest
              rate for the entire tenure, usually higher than savings accounts.
            </li>
            <li>
              <strong>Maturity:</strong> Upon maturity, you receive the
              principal amount along with the accumulated interest.
            </li>
            <li>
              <strong>Premature Withdrawal:</strong> Withdrawing before the
              maturity date may incur penalties and reduced interest.
            </li>
          </ol>
        </section>

        {/* FD Formula */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Fixed Deposit Interest Calculation
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            The interest earned on a fixed deposit can be calculated using the
            formula:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base">
            <code className="block overflow-x-auto">A = P(1 + r/n)^(nt)</code>
          </div>
          <p className="text-sm md:text-base text-gray-700 mt-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
            <li>
              <strong>A</strong> = Total amount (principal + interest)
            </li>
            <li>
              <strong>P</strong> = Principal amount (initial investment)
            </li>
            <li>
              <strong>r</strong> = Annual interest rate (in decimal)
            </li>
            <li>
              <strong>n</strong> = Number of times interest is compounded per
              year
            </li>
            <li>
              <strong>t</strong> = Time the money is invested for (in years)
            </li>
          </ul>
        </section>

        {/* Example */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Fixed Deposit Calculation Example
          </h2>
          <p className="text-sm md:text-base text-gray-700">
            Suppose you invest ₹1,00,000 in a fixed deposit at an annual
            interest rate of 6% for a tenure of 3 years, compounded annually.
            The total amount at maturity can be calculated as:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base mt-4">
            <code>
              A = 1,00,000(1 + 0.06/1)^(1*3) = 1,00,000(1.191016) ≈ ₹1,19,102
            </code>
          </div>
          <p className="text-sm md:text-base text-gray-700 mt-4">
            After 3 years, the total amount will be approximately ₹1,19,102,
            which includes ₹19,102 as interest earned.
          </p>
        </section>

        {/* Benefits of FD */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Benefits of Fixed Deposit
          </h2>
          <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
            <li>
              <strong>Safe Investment:</strong> FDs are considered a safe and
              secure investment option with guaranteed returns.
            </li>
            <li>
              <strong>Fixed Returns:</strong> You know exactly how much you will
              earn at the end of the tenure.
            </li>
            <li>
              <strong>Flexible Tenure:</strong> You can choose a tenure that
              suits your financial goals.
            </li>
            <li>
              <strong>No Market Risk:</strong> FDs are not affected by market
              fluctuations, providing stable returns.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default FD_calculator;
