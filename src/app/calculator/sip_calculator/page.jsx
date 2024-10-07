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

function SipCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(500);
  const [annualReturnRate, setAnnualReturnRate] = useState(6); // in percentage
  const [investmentDuration, setInvestmentDuration] = useState(1); // in years
  const [investmentFrequency, setInvestmentFrequency] = useState("monthly");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const { periodsPerYear } = useFrequencyValues(investmentFrequency);
  // SIP Calculation function based on frequency
  const calculateSIP = () => {
    const totalPeriods = investmentDuration * periodsPerYear; // Total number of periods (N)
    const ratePerPeriod = annualReturnRate / periodsPerYear / 100; // Periodic interest rate (R)

    const futureValue =
      investmentAmount *
      (((1 + ratePerPeriod) ** totalPeriods - 1) / ratePerPeriod) *
      (1 + ratePerPeriod);

    const totalInvested = investmentAmount * totalPeriods;
    const returns = futureValue - totalInvested;

    setTotalInvestment(totalInvested.toFixed(0));
    setEstimatedReturns(returns.toFixed(0));
    setTotalValue(futureValue.toFixed(0));
  };

  // Recalculate SIP when any slider or dropdown changes
  useEffect(() => {
    calculateSIP();
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
                <BreadcrumbPage>SIP Calculators</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="md:text-4xl font-semibold">SIP Calculator</h1>
          <div className="flex rounded-lg justify-between md:w-[1000px] w-full md:flex-nowrap flex-wrap">
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
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Annually</option>
                  <option value="half-yearly">Semi-Annually</option>
                </select>
              </div>

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
        <div className="max-w-4xl  mt-4">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold  mb-6">
            What is a Systematic Investment Plan (SIP)?
          </h1>

          {/* SIP Explanation */}
          <section className="mb-8">
            <p className="text-sm md:text-base leading-6 text-gray-700 text-justify">
              A <strong>Systematic Investment Plan (SIP)</strong> is a
              convenient way to invest in mutual funds by contributing a fixed
              amount at regular intervals (monthly, quarterly, etc.). SIPs help
              reduce the risk of market volatility and utilize the power of
              compounding to generate long-term returns.
            </p>
          </section>

          {/* How Does SIP Work */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              How Does SIP Work?
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-gray-700">
              <li>
                <strong>Choose a Mutual Fund:</strong> Select a mutual fund that
                matches your financial goals and risk profile.
              </li>
              <li>
                <strong>Decide on an Amount:</strong> Choose a fixed investment
                amount (e.g., ₹500/month).
              </li>
              <li>
                <strong>Choose Investment Period:</strong> Decide the duration
                (e.g., 5, 10 years). Longer periods maximize compounding.
              </li>
              <li>
                <strong>Auto-Debit:</strong> The chosen amount will be
                auto-debited from your account periodically.
              </li>
              <li>
                <strong>Rupee Cost Averaging:</strong> SIP helps buy more units
                when prices are low and fewer when prices are high, reducing
                market risk.
              </li>
              <li>
                <strong>Compounding Effect:</strong> Your investments and
                returns compound over time, helping grow your wealth.
              </li>
            </ol>
          </section>

          {/* SIP Formula */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              SIP Formula: How to Calculate Your SIP Returns
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              The formula for calculating the future value of your SIP
              investment is as follows:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base">
              <code className="block overflow-x-auto">
                Future Value = P × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
              </code>
            </div>
            <p className="text-sm md:text-base text-gray-700 mt-4">Where:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
              <li>
                <strong>P</strong> = Monthly investment amount
              </li>
              <li>
                <strong>r</strong> = Rate of return per month (annual rate / 12)
              </li>
              <li>
                <strong>n</strong> = Total number of months
              </li>
            </ul>
          </section>

          {/* Example */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Example</h2>
            <p className="text-sm md:text-base text-gray-700">
              If you invest ₹5,000 per month for 10 years with an expected
              return of 12% per annum, here’s how the formula will work:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base mt-4">
              <p>
                <strong>P</strong> = ₹5,000
              </p>
              <p>
                <strong>r</strong> = 12%/12 = 0.01
              </p>
              <p>
                <strong>n</strong> = 120 months
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Benefits of SIP Formula
            </h2>
            <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
              <li>
                <strong>Predict Returns:</strong> The formula helps you estimate
                the future value of your SIP, allowing you to plan better.
              </li>
              <li>
                <strong>Plan Financial Goals:</strong> Calculate how much you
                need to invest regularly to reach your financial goals.
              </li>
              <li>
                <strong>Flexibility:</strong> Adjust your SIP amount or tenure
                based on your financial circumstances to maximize returns.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default SipCalculator;
