export const calculateAge = (birthDateString: string | null, deathDateString: string | null) => {
	if (!birthDateString) return null;
	const birthDate = new Date(birthDateString);
	const endDate = deathDateString ? new Date(deathDateString) : new Date();

	let age = endDate.getFullYear() - birthDate.getFullYear();
	const m = endDate.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};
