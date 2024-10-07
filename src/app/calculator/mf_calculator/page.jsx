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

function MfCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(500); 
  const [annualReturnRate, setAnnualReturnRate] = useState(6); // in percentage
  const [investmentDuration, setInvestmentDuration] = useState(1); // in years
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const calculateMutualFund = () => {
    const totalPeriods = investmentDuration * 12; // Total number of periods (N)
    const ratePerPeriod = annualReturnRate / 12 / 100; // Periodic interest rate (R)

    const futureValue =
      investmentAmount *
      (((1 + ratePerPeriod) ** totalPeriods - 1) / ratePerPeriod) *
      (1 + ratePerPeriod);

    const totalInvested = investmentAmount * totalPeriods;
    const returns = futureValue - totalInvested;

    setTotalInvestment(totalInvested.toFixed(0) || 0);
    setEstimatedReturns(returns.toFixed(0) || 0);
    setTotalValue(futureValue.toFixed(0) || 0);
  };

  useEffect(() => {
    calculateMutualFund();
  }, [investmentAmount, annualReturnRate, investmentDuration]);

  // Pie chart data
  const data = [
    { name: "Total Investment", value: parseFloat(totalInvestment) },
    { name: "Estimated Returns", value: parseFloat(estimatedReturns) },
  ];

  // Ensure that if all values are zero, the chart still renders
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
              <BreadcrumbLink href="/" >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage >
                Mutual Fund Returns Calculator
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="md:text-4xl font-semibold">
          Mutual Fund Returns Calculator
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
                min="500"
                max="10000000"
                step="500"
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
              <label className="text-gray-700 flex w-full justify-between items-center">
                <p className="md:text-lg text-[12px]">Expected Return Rate (p.a)</p>
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
                        } else if (parsedValue > 50) {
                          setAnnualReturnRate(50);
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
                max="50"
                value={annualReturnRate}
                onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                className="mt-1 w-full outline-none"
                style={{
                  background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    50
                  )}%, #e2e8f0 ${getSliderPercentage(
                    annualReturnRate,
                    1,
                    50
                  )}%)`,
                }}
              />
            </div>

            {/* Investment Duration */}
            <div className="mb-4 space-y-3">
              <label className="text-gray-700 flex w-full justify-between items-center">
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
                className="w-full outline-none"
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
              <Pie_Chart data={data} COLORS={COLORS} cy={200} height={400} />
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
      <h1 className="text-3xl md:text-4xl font-bold  mb-6">
        What is a Mutual Fund?
      </h1>

      {/* Mutual Fund Explanation */}
      <section className="mb-8">
        <p className="text-sm md:text-base leading-6 text-gray-700">
          A <strong>Mutual Fund</strong> is a type of investment vehicle that pools
          together money from multiple investors to invest in a diversified portfolio
          of stocks, bonds, or other securities. Managed by professional fund managers,
          mutual funds allow individuals to gain exposure to a variety of assets, helping
          them diversify their investment portfolio while mitigating individual risk.
        </p>
      </section>

      {/* How Does a Mutual Fund Work */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          How Does a Mutual Fund Work?
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-gray-700">
          <li>
            <strong>Pooling of Funds:</strong> Multiple investors contribute money
            to a common fund. This pool is then used to invest in various assets.
          </li>
          <li>
            <strong>Fund Manager:</strong> A professional fund manager is responsible
            for managing the fund and making investment decisions.
          </li>
          <li>
            <strong>Diversification:</strong> By investing in a mutual fund, investors
            get exposure to a diversified portfolio of securities, reducing risk.
          </li>
          <li>
            <strong>Returns:</strong> The gains (or losses) from the fund are shared
            among all investors in proportion to their investment.
          </li>
          <li>
            <strong>Net Asset Value (NAV):</strong> The NAV represents the per-unit price
            of the mutual fund, which fluctuates based on market performance.
          </li>
        </ol>
      </section>

      {/* Types of Mutual Funds */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Types of Mutual Funds
        </h2>
        <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
          <li><strong>Equity Funds:</strong> These funds invest primarily in stocks and are suited for long-term growth.</li>
          <li><strong>Debt Funds:</strong> These invest in fixed-income securities like bonds and are ideal for lower-risk, steady income.</li>
          <li><strong>Hybrid Funds:</strong> A combination of both equity and debt investments, balancing risk and reward.</li>
          <li><strong>Index Funds:</strong> These track a particular index, such as the Nifty 50, providing a passive investment option.</li>
        </ul>
      </section>

      {/* Mutual Fund Formula */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Mutual Fund NAV Formula: Understanding Your Investment Value
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-4">
          The Net Asset Value (NAV) is used to calculate the value of your mutual fund units:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base">
          <code className="block overflow-x-auto">
            NAV = (Total Assets - Total Liabilities) / Number of Outstanding Units
          </code>
        </div>
        <p className="text-sm md:text-base text-gray-700 mt-4">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
          <li><strong>Total Assets</strong> = The market value of all assets in the fund.</li>
          <li><strong>Total Liabilities</strong> = Any liabilities or expenses the fund has.</li>
          <li><strong>Number of Outstanding Units</strong> = The total units of the fund held by investors.</li>
        </ul>
      </section>

      {/* Example */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Example</h2>
        <p className="text-sm md:text-base text-gray-700">
          If the total assets of a mutual fund are ₹1,00,00,000, total liabilities are ₹5,00,000,
          and there are 10,00,000 outstanding units, the NAV will be:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base mt-4">
          <code>
            NAV = (₹1,00,00,000 - ₹5,00,000) / 10,00,000 = ₹9.50
          </code>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Benefits of Investing in Mutual Funds</h2>
        <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
          <li><strong>Diversification:</strong> Investing in a mutual fund gives you access to a wide variety of assets, reducing individual risk.</li>
          <li><strong>Professional Management:</strong> Experienced fund managers handle your investments, making decisions based on research and market analysis.</li>
          <li><strong>Liquidity:</strong> Most mutual funds allow you to redeem your units at any time, offering flexibility and liquidity.</li>
          <li><strong>Accessibility:</strong> Mutual funds allow individuals to start investing with small amounts, making them accessible to all investors.</li>
        </ul>
      </section>
    </div>
    </div>
  );
}

export default MfCalculator;
