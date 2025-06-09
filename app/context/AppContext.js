import React, {
  createContext,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentStatus,
  AppOpenAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";
import mobileAds from "react-native-google-mobile-ads";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const loadingRef = useRef(false); // Prevent unnecessary re-renders
  const [forceRender, setForceRender] = useState(false); // Used for UI updates

  const setLoading = (value) => {
    loadingRef.current = value;
    setForceRender((prev) => !prev); // Toggle to trigger UI update
  };

  const [isNonPersonalized, setIsNonPersonalized] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [adReady, setAdReady] = useState(false);
  const [adClosed, setAdClosed] = useState(false);

  useEffect(() => {
    async function initConsent() {
      try {
        // First, initialize the Mobile Ads SDK

        await mobileAds()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.T,
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent: false,
            testDeviceIdentifiers: ["EMULATOR"],
          })
          .then(() => {
            // Request config successfully set!
            console.log("Request config successfully set!");
          });

        const consentInfo = await AdsConsent.requestInfoUpdate();

        if (
          consentInfo.isConsentFormAvailable &&
          consentInfo.status === AdsConsentStatus.REQUIRED
        ) {
          await AdsConsent.showForm();
        }

        const updatedInfo = await AdsConsent.getConsentInfo();
        const nonPersonalized =
          updatedInfo.status === AdsConsentStatus.REQUIRED;
        setIsNonPersonalized(nonPersonalized);
        setConsentChecked(true);

        console.log("npa", isNonPersonalized);

        // if (
        //   consentInfo.status === AdsConsentStatus.DENIED ||
        //   consentInfo.status === AdsConsentStatus.NON_PERSONALIZED
        // ) {
        //   setIsNonPersonalized(true);
        // } else {
        //   setIsNonPersonalized(false);
        // }
        //

        await mobileAds()
          .initialize()
          .then((adapterStatuses) => {
            // Initialization complete!

            console.log("ads", adapterStatuses);
            setAdReady(true);
          });
        // setAdReady(true);
      } catch (err) {
        console.warn("Consent init error:", err);
        setIsNonPersonalized(true);
        setConsentChecked(true);
        // safe fallback
      } finally {
        setConsentChecked(true);
      }
    }

    initConsent();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading: loadingRef.current,
        setLoading,
        isNonPersonalized,
        adReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
