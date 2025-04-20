<script>
  import { onMount } from "svelte";
  let properties = [];
  let units = [];
  let users = [];
  let selectedProperty = "";
  let selectedUnit = "";
  let selectedUser = "";
  let file = null;

  let owner = "";

  function decodeJWT(token) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  const token = localStorage.getItem('token');
  let userInfo;

  if (token) {
    try {
      userInfo = decodeJWT(token);
      owner = userInfo.id;
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }

  onMount(async () => {
    try {
      const res = await fetch(`/api/property/owner/${owner}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch properties: ${res.status}`);
      }

      const data = await res.json();
      properties = data.properties;
    } catch (error) {
      console.error("Error loading properties:", error);
    }

    try {
      const userRes = await fetch("http://localhost:5173/api/user");
      if (!userRes.ok) {
        throw new Error(`Failed to fetch users: ${userRes.status}`);
      }
      const userData = await userRes.json();
      users = userData.users;
    } catch (error) {
      console.error("Error loading users:", error);
    }
  });

  async function handlePropertyChange(event) {
    selectedProperty = event.target.value;
    if (selectedProperty) {
      try {
        const res = await fetch(`/api/unit/property/${selectedProperty}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch units: ${res.status}`);
        }

        const data = await res.json();
        units = data.units;
      } catch (error) {
        console.error("Error loading units:", error);
        units = [];
      }
    } else {
      units = [];
    }
  }

  function handleFileUpload(event) {
    file = event.target.files[0];
  }

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function uploadDocument() {
    if (!selectedUser || !selectedUnit || !file) {
      alert("Please fill all the fields and upload a file.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          let base64File;

          if (typeof reader.result === 'string') {
            base64File = reader.result.split(",")[1];
          } else {
            base64File = arrayBufferToBase64(reader.result);
          }

          const res = await fetch(`http://localhost:5173/api/property/document/${owner}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              owner, 
              tenantId: selectedUser,
              unitId: selectedUnit,
              file: base64File,
            }),
          });

          if (!res.ok) {
            throw new Error(`Failed to upload document: ${res.status}`);
          }

          const data = await res.json();
          console.log("Document uploaded successfully:", data);
        } else {
          console.error("Error: Failed to read the file as base64.");
        }
      };
      
      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Error uploading document:", error);
    }
  }
</script>

<div>
  <p>Select a Property</p>
  
  <select bind:value={selectedProperty} on:change={handlePropertyChange}>
    <option value="">-- Select Property --</option>
    {#each properties as property}
      <option value={property.id}>{property.name}</option>
    {/each}
  </select>

  {#if selectedProperty}
    <p>Select a Unit</p>
    <select bind:value={selectedUnit}>
      <option value="">-- Select Unit --</option>
      {#each units as unit}
        <option value={unit.id}>{unit.number}</option>
      {/each}
    </select>
  {/if}

  <p>Select a User</p>
  <select bind:value={selectedUser}>
    <option value="">-- Select User --</option>
    {#each users as user}
      <option value={user.id}>{user.firstName} {user.lastName}</option>
    {/each}
  </select>

  <p>Upload a Document</p>
  <input type="file" on:change={handleFileUpload} accept="application/pdf, .doc, .docx, .jpg, .jpeg, .png" />

  <button on:click={uploadDocument}>Upload Document</button>
</div>
