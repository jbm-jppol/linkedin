# LinkedIn tagging tool

Et simpelt og brugervenligt værktøj til at generere UTM-taggede URLs til artikler, der deles på eksterne platforme som LinkedIn, Facebook, Twitter osv.

## Funktioner

- **Simpel brugerflade**: Google-lignende design der er let at bruge
- **Automatisk URL-generering**: Genererer korrekt formaterede UTM-parametre
- **Nem kopiering**: Ét klik for at kopiere den genererede URL
- **Validering**: Sikrer at alle påkrævede felter er udfyldt korrekt
- **Responsivt design**: Fungerer på både desktop og mobil

## Sådan bruges det

1. Åbn `index.html` i din webbrowser
2. Udfyld følgende felter:
   - **URL**: Den oprindelige artikel-URL
   - **Source**: Platformen (f.eks. linkedin, facebook, twitter)
   - **Medium**: Mediet (f.eks. social, email, cpc)
   - **Campaign**: Kampagnenavnet (f.eks. artikel-navn eller produkt-navn)
   - **Content** (valgfri): Specifik indhold (f.eks. tekst-link, banner-link)
   - **Term** (valgfri): Nøgleord
3. Klik på "Generer URL"
4. Kopier den genererede URL ved at klikke på kopier-ikonet

## Eksempel

**Input:**
- URL: `https://example.com/article`
- Source: `linkedin`
- Medium: `social`
- Campaign: `nyhed-artikel`

**Output:**
```
https://example.com/article?utm_source=linkedin&utm_medium=social&utm_campaign=nyhed-artikel
```

## Tekniske detaljer

- Ren HTML, CSS og JavaScript - ingen eksterne afhængigheder
- Fungerer offline efter første indlæsning
- Automatisk formatering af UTM-parametre (lowercase, bindestreger i stedet for mellemrum)

