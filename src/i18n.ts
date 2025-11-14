import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Minimal i18n setup to avoid runtime warnings and render friendly labels
void i18n
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		defaultNS: "translation",
		resources: {
			en: {
				translation: {
					nav: {
						home: "Home",
						stats: "Stats",
						workouts: "Workouts",
						"diet-plans": "Diet Plans",
						trainers: "Trainers",
						settings: "Settings",
					},
				},
			},
		},
	});

export default i18n;
