import React, { useState, useEffect, useRef } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Country } from "../../data/country";
import getCountries from "../../data/get-countries";
import getCountry from "../../data/get-country";
import CountryCurrency from "../country-currency";
import CountryItem from "./country-item";

// Countries page renders the country search
const Countries: React.FunctionComponent = () => {
  const inputTextRef: React.RefObject<HTMLInputElement> | null = useRef(null);
  const throttling = useRef(false);

  const [countries, setCountries] = useState<Array<Country>>([]);
  const [selectedCountries, setSelectedCountries] = useState<Array<Country>>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>();
  const [selectDisabled, setSelectDisabled] = useState<boolean>(false);

  const wrapperRef: React.RefObject<HTMLInputElement> | null = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // const onSearchTermChange = async (event: any): Promise<void> => {
  //   setSearchTerm(event.target.value)
  //   if (event.target.value.length > 0) {
  //     const [isError, result] = await getCountries(event.target.value)
  //     if (!isError && result) {
  //       setCountries(result)
  //       setShowSuggestions(true)
  //     } else {
  //       setShowSuggestions(false)
  //       alert(`Error while fetching countries`)
  //     }
  //   }
  // }

  const onSearchTermChange = async (): Promise<void> => {
    if (throttling.current) {
      return;
    }

    if (!inputTextRef.current?.value.trim()) {
      setCountries([]);
      return;
    }
    throttling.current = true;
    setTimeout(async () => {
      throttling.current = false;
      if (inputTextRef.current?.value.trim()) {
        const [isError, result] = await getCountries(
          inputTextRef.current?.value.trim()
        );
        if (!isError && result) {
          setCountries(result);
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
          alert(`Error while fetching countries`);
        }
      }
    }, 600);
  };

  const onCountrySelect = async (country: Country): Promise<void> => {
    setSelectDisabled(true);
    if (
      selectedCountries.find(
        (selectedCountry) => selectedCountry.name === country.name
      )
    ) {
      alert(`Country already added`);
    } else {
      const [isError, result] = await getCountry(country.name);
      if (!isError && result) {
        setSelectedCountries([...selectedCountries, result]);
      } else {
        alert(`Error while fetching selected country`);
      }
    }
    setSelectDisabled(false);
  };

  const onLogoutSubmit = (): void => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <div className="logout">
        <Button variant="secondary" onClick={onLogoutSubmit}>
          Logout
        </Button>
      </div>

      <div className="countries-page">
        <div className="countries-search">
          <p className="countries-title">Countries</p>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              {/* <FormControl
                placeholder="Search for a country by name"
                type="text"
                value={searchTerm}
                onChange={onSearchTermChange}
              /> */}
              <FormControl
                placeholder="Search for a country by name"
                type="text"
                ref={inputTextRef}
                onChange={onSearchTermChange}
              />
            </InputGroup>
          </div>
          <div>
            <div ref={wrapperRef}>
              {showSuggestions && countries && countries.length
                ? countries.map((country) => (
                    <CountryItem
                      key={country.name}
                      country={country}
                      onSelect={onCountrySelect}
                      selectDisabled={selectDisabled}
                    ></CountryItem>
                  ))
                : null}
            </div>
          </div>
          <div></div>
        </div>
        <div className="countries-selected">
          <p className="countries-title">Selected countries</p>
          {selectedCountries && selectedCountries.length ? (
            <CountryCurrency countries={selectedCountries} />
          ) : (
            <div>No countries selected yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countries;
