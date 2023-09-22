const form = document.querySelector('form');
    const messageBox = document.getElementById('messageBox');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/import-csv', {
                method: 'POST',
                body: formData,
            });
            if (response.status === 201) {
                // Show SweetAlert success message
                Swal.fire({
                    title: 'Success!',
                    text: 'File uploaded and processed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
    
                // Clear the file input
                document.getElementById('file').value = '';
            } else if (response.status === 400) {
                // Handle 400 Bad Request
                const data = await response.json();
                Swal.fire({
                    title: 'Failed!',
                    text: data.error,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                // Handle other error statuses
                Swal.fire({
                    title: 'Failed!',
                    text: 'An error occurred.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

            // if (response.ok) {
            //     // Show SweetAlert success message
            //     Swal.fire({
            //         title: 'Success!',
            //         text: 'File uploaded and processed successfully.',
            //         icon: 'success',
            //         confirmButtonText: 'OK',
            //     });

            //     // Clear the file input
            //     document.getElementById('file').value = '';
            // } else {
            //     // Handle error cases and show SweetAlert error message if needed
            //     Swal.fire({
            //         title: 'Failed!',
            //         text: 'File already exist in the database. Please add a new file.',
            //         icon: 'error',
            //         confirmButtonText: 'OK',
            //     });
            // }

            // const data = await response.json();
            // if (response.ok) {
            //     messageBox.textContent = 'File uploaded and processed successfully.';
            // } else {
            //     messageBox.textContent = data.error || 'An error occurred.';
            // }
        } catch (error) {
            console.error('Error:', error);
            messageBox.textContent = 'An error occurred.';
        }
    });


    document.getElementById('downloadButton').addEventListener('click', async () => {
        const isrcCode = document.getElementById('isrcCode').value;

        // Construct the actual URL with the isrcCode value
        const downloadUrl = `/fetch-data/${isrcCode}`;

        // window.open(downloadUrl, '_blank');
        // Function to trigger file download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'data.xlsx'; // Specify the desired filename
        a.target = '_blank'; // Open the URL in a new tab
        a.click();
    });
