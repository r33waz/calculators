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
import formatNumberInNepali from "@/utils/formattedNumber";

function LumpSumCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(50000); // Default lump sum investment
  const [annualReturnRate, setAnnualReturnRate] = useState(6); // in percentage
  const [investmentDuration, setInvestmentDuration] = useState(1); // in years
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Lump Sum Calculation function
  const calculateLumpSum = () => {
    const ratePerPeriod = annualReturnRate / 100; // Annual interest rate
    const futureValue =
      investmentAmount * (1 + ratePerPeriod) ** investmentDuration; // Future value formula for lump sum investment

    const totalInvested = investmentAmount; // Total investment is just the initial lump sum
    const returns = futureValue - totalInvested; // Returns are the future value minus total invested

    setTotalInvestment(totalInvested.toFixed(0));
    setEstimatedReturns(returns.toFixed(0));
    setTotalValue(futureValue.toFixed(0));
  };

  // Recalculate Lump Sum when any slider or dropdown changes
  useEffect(() => {
    calculateLumpSum();
  }, [investmentAmount, annualReturnRate, investmentDuration]);

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
    <>
      <div className="grid place-content-center w-full">
        <div className="flex flex-col gap-4">
          <Breadcrumb className="mt-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Lump Sum Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="md:text-4xl font-semibold">Lump Sum Calculator</h1>
          <div className="flex rounded-lg justify-between md:w-[1000px] w-full md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full md:gap-8 gap-4 p-2">
              {/* Investment Amount */}
              <div className="mb-4 space-y-3">
                <label className="text-gray-700 flex w-full justify-between items-center">
                  <p className="md:text-lg text-[12px]">
                    Investment Amount (Rs)
                  </p>
                  <div className="text-sm bg-[#00C49F] px-1 py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                    <span>Rs</span>
                    <input
                      className={`md:text-lg text-sm outline-none w-24 text-right ${
                        investmentAmount < 0 ? "bg-red-500" : "bg-[#00C49F]"
                      }`}
                      value={investmentAmount === 0 ? "" : investmentAmount} // Allow clearing input
                      onChange={(e) => {
                        const value = e.target.value;
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

                        if (value === "") {
                          setAnnualReturnRate(0);
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
                  onChange={(e) =>
                    setInvestmentDuration(Number(e.target.value))
                  }
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
          <div className="max-w-4xl mt-4">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              What is a Lump Sum Investment?
            </h1>

            {/* Lump Sum Explanation */}
            <section className="mb-8">
              <p className="text-sm md:text-base leading-6 text-gray-700 text-justify">
                A <strong>Lump Sum Investment</strong> refers to investing a
                large amount of money all at once, rather than in installments.
                This approach can be beneficial for those who have a significant
                amount of capital available to invest immediately, taking
                advantage of potential market growth and compounding interest.
              </p>
            </section>

            {/* How Does Lump Sum Work */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                How Does Lump Sum Investment Work?
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-gray-700">
                <li>
                  <strong>Determine Investment Amount:</strong> Decide how much
                  money you want to invest as a lump sum.
                </li>
                <li>
                  <strong>Choose an Investment Vehicle:</strong> Select where
                  you want to invest your lump sum (e.g., stocks, mutual funds,
                  bonds).
                </li>
                <li>
                  <strong>Timing the Investment:</strong> Consider market
                  conditions and potential growth when making the investment.
                </li>
                <li>
                  <strong>Long-Term Growth:</strong> Allow your investment to
                  grow over time, benefiting from compounding returns.
                </li>
                <li>
                  <strong>Monitoring and Adjustments:</strong> Regularly review
                  your investment to ensure it aligns with your financial goals.
                </li>
              </ol>
            </section>

            {/* Lump Sum Investment Formula */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Lump Sum Investment Formula: How to Calculate Future Value
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                The formula for calculating the future value of a lump sum
                investment is:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base">
                <code className="block overflow-x-auto">
                  Future Value = P × (1 + r)<sup>n</sup>
                </code>
              </div>
              <p className="text-sm md:text-base text-gray-700 mt-4">Where:</p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
                <li>
                  <strong>P</strong> = Initial investment amount
                </li>
                <li>
                  <strong>r</strong> = Annual rate of return (in decimal form)
                </li>
                <li>
                  <strong>n</strong> = Number of years the money is invested
                </li>
              </ul>
            </section>

            {/* Example */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Example
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                If you invest ₹10,000 as a lump sum for 5 years with an expected
                return of 8% per annum, here’s how the formula will work:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base mt-4">
                <p>
                  <strong>P</strong> = ₹10,000
                </p>
                <p>
                  <strong>r</strong> = 8% = 0.08
                </p>
                <p>
                  <strong>n</strong> = 5 years
                </p>
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Benefits of Lump Sum Investments
              </h2>
              <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
                <li>
                  <strong>Immediate Growth Potential:</strong> Investing a lump
                  sum can lead to quicker gains compared to incremental
                  investments.
                </li>
                <li>
                  <strong>Benefit from Compounding:</strong> The longer the
                  investment remains untouched, the more it can grow through
                  compounding.
                </li>
                <li>
                  <strong>Flexibility:</strong> You can choose to reinvest your
                  returns or withdraw them based on your financial goals.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default LumpSumCalculator;
