'use client';
import BigSideBar from '@/components/BigSideBar/bigsidebar';
import Checkbox from '@/components/FormFields/checkbox';
import Dropdown from '@/components/FormFields/dropdown';
import SideNavApp from '@/components/SideNav/sidenavbar';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { MdOutlinePerson } from 'react-icons/md';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Home() {
  const [apiData, setApiData] =
    useState<Array<[number, number, number, number, number]>>();
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [coinId, setCoinId] = useState('bitcoin');
  const [showOpen, setShowOpen] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const [showLow, setShowLow] = useState(true);
  const [showHigh, setShowHigh] = useState(true);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_CG_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_CG_API_KEY;

  useEffect(() => {
    fetchCoinData(coinId);
    setDefaultData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);

  const requestData = {
    vs_currency: 'usd',
    days: 30,
    precision: 2,
  };

  const fetchCoinData = (coinId: string) => {
    axios
      .get(`${baseUrl}/coins/${coinId}/ohlc`, {
        params: requestData,
        headers: {
          'x-cg-api-key': apiKey, // Add your API key here
        },
      })
      .then((res) => {
        const transformedData = res.data.map(
          ([timestamp, open, close, low, high]: [
            number,
            number,
            number,
            number,
            number,
          ]) => ({
            date: new Date(timestamp),
            open,
            close,
            low,
            high,
          }),
        );
        setApiData(transformedData);
        const flatData = transformedData.flat();
        const minValue = Math.min(...flatData);
        const maxValue = Math.max(...flatData);
        const buffer = 1000;
        setYAxisDomain([minValue - buffer, maxValue + buffer]);
        setLoading(true);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const setDefaultData = () => {
    const storedPreferences = localStorage.getItem('preferences');

    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);

      if (preferences[coinId]) {
        const coinPreferences = preferences[coinId];

        setShowOpen(coinPreferences.showOpen ?? true);
        setShowClose(coinPreferences.showClose ?? true);
        setShowLow(coinPreferences.showLow ?? true);
        setShowHigh(coinPreferences.showHigh ?? true);
      } else {
        setShowOpen(true);
        setShowClose(true);
        setShowLow(true);
        setShowHigh(true);
      }
    }
  };

  const handleSelect = (selectedOption: string) => {
    setCoinId(selectedOption);
  };

  const savePreferences = () => {
    const storedPreferences = localStorage.getItem('preferences');
    const existingPreferences = storedPreferences
      ? JSON.parse(storedPreferences)
      : {};

    if (existingPreferences[coinId]) {
      existingPreferences[coinId] = {
        showOpen,
        showClose,
        showLow,
        showHigh,
      };
    } else {
      existingPreferences[coinId] = {
        showOpen,
        showClose,
        showLow,
        showHigh,
      };
    }

    localStorage.setItem('preferences', JSON.stringify(existingPreferences));
  };

  return (
    <>
      <div className="flex flex-row w-screen bg-gradient-to-r from-white to-red-100">
        <div className="flex w-max">
          <SideNavApp currentRoute="/crypto" />
          <BigSideBar currentRoute="/crypto/production/tokens" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex h-36 border-0 border-b-2 border-slate-400 w-full justify-end pb-5">
            <div className="flex bg-white drop-shadow-md rounded-md h-16 w-64 mr-40 mt-10 item-center justify-center p-3">
              <MdOutlinePerson size={35} style={{ color: 'black' }} />
              <div className="font-bold text-black mt-2 ml-2">
                Tina Li / 0x009075
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex items-center py-5 px-10">
              <Dropdown
                className="p-2 mr-2"
                options={['bitcoin', 'ethereum', 'matic-network']}
                onSelect={handleSelect}
              />
              <button
                onClick={() => savePreferences()}
                className="flex items-center justify-center text-white bg-custom-red hover:bg-red-950 w-24 h-10 rounded-md"
                type="button"
              >
                Save
              </button>
            </div>
            {loading && (
              <div className="flex flex-col grid grid-cols-4 px-24 h-16 ">
                <Checkbox
                  label="Open"
                  checked={showOpen}
                  onChange={() => setShowOpen(!showOpen)}
                />
                <Checkbox
                  label="Close"
                  checked={showClose}
                  onChange={() => setShowClose(!showClose)}
                />
                <Checkbox
                  label="Low"
                  checked={showLow}
                  onChange={() => setShowLow(!showLow)}
                />
                <Checkbox
                  label="High"
                  checked={showHigh}
                  onChange={() => setShowHigh(!showHigh)}
                />
              </div>
            )}
          </div>
          {loading && (
            <div className="flex felx-col mb-20 justify-center items-center p-3">
              <LineChart
                className="bg-white p-20 border-0 drop-shadow-2xl rounded-lg"
                width={1200}
                height={600}
                data={apiData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'dd/MM')}
                />
                <YAxis domain={yAxisDomain} />
                <Tooltip />
                <Legend />
                {showOpen && (
                  <Line type="monotone" dataKey="open" stroke="green" />
                )}
                {showClose && (
                  <Line type="monotone" dataKey="close" stroke="red" />
                )}
                {showLow && (
                  <Line type="monotone" dataKey="low" stroke="purple" />
                )}
                {showHigh && (
                  <Line type="monotone" dataKey="high" stroke="brown" />
                )}
              </LineChart>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
