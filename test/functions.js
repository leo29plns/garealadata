// Pour récupérer et charger nos données en json
export async function fetchAndGroupFiles(fileNames) {
    try {
        const fileDataPromises = fileNames.map(fileName => {
            return fetch(fileName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Fetch error for ${fileName}`);
                    }
                    return response.json();
                });
        });

        const fileDataArray = await Promise.all(fileDataPromises);

        const groupedData = fileDataArray.reduce((merged, data) => {
            return Object.assign(merged, data['data']);
        }, {});

        return groupedData;

       
       
    } catch (error) {
        console.error("Error:", error);
    }
}