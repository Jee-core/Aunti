import { NextRequest, NextResponse } from 'next/server';
import { mockDoulas } from '../../../lib/mockDoulas';
import { Doula } from '../../../types/doula';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');
    const typesParam = searchParams.get('types'); // comma-separated
    const date = searchParams.get('date');         // YYYY-MM-DD
    const forceError = searchParams.get('error');

    // New filters
    const daysParam = searchParams.get('days');
    const careParam = searchParams.get('care');
    const certParam = searchParams.get('cert');
    const incParam = searchParams.get('inc');
    const specParam = searchParams.get('spec');
    const supParam = searchParams.get('sup');
    const langParam = searchParams.get('lang');

    // Price filters
    const minBirthFee = Number(searchParams.get('minBirthFee') ?? '0');
    const maxBirthFee = Number(searchParams.get('maxBirthFee') ?? '3000');
    const minPostpartumRate = Number(searchParams.get('minPostpartumRate') ?? '0');
    const maxPostpartumRate = Number(searchParams.get('maxPostpartumRate') ?? '150');

    // Simulate realistic network latency
    await new Promise<void>((resolve) => setTimeout(resolve, 300));

    // Trigger mock error: ?error=true  or  zip=99999
    if (forceError === 'true' || zip === '99999') {
      return NextResponse.json(
        { message: 'Unable to reach the doula directory right now. Please try again shortly.' },
        { status: 500 }
      );
    }

    let results: Doula[] = [...mockDoulas];

    // Filter by zip prefix
    const cleanZip = zip?.trim() ?? '';
    if (cleanZip.length > 0) {
      results = results.filter((d) => d.zipCode.startsWith(cleanZip));
    }

    // Filter by type(s)
    if (typesParam && typesParam.trim().length > 0) {
      const selectedTypes = typesParam
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      if (selectedTypes.length > 0) {
        // Special mapping if they search 'Birth Doula', 'Postpartum Doula' etc.
        const mappedTypes = selectedTypes.map(t => {
          if (t.includes('Birth')) return 'Birth';
          if (t.includes('Postpartum')) return 'Postpartum';
          if (t.includes('Full Spectrum')) return 'Full Spectrum';
          return t;
        });
        results = results.filter((d) => mappedTypes.includes(d.type));
      }
    }

    // Filter by exact available date
    const cleanDate = date?.trim() ?? '';
    if (cleanDate.length > 0) {
      results = results.filter((d) => d.availableDates.includes(cleanDate));
    }

    // Filter by preferred days of the week (match if doula is available on any selected day)
    const cleanDays = daysParam ? daysParam.split(',').map(d => d.trim()).filter(Boolean) : [];
    if (cleanDays.length > 0) {
      results = results.filter((d) => 
        d.availableDays && cleanDays.some(day => d.availableDays?.includes(day))
      );
    }

    // Filter by care offered (must offer all selected care items)
    const cleanCare = careParam ? careParam.split(',').map(c => c.trim()).filter(Boolean) : [];
    if (cleanCare.length > 0) {
      results = results.filter((d) =>
        d.careOffered && cleanCare.every(c => d.careOffered?.includes(c))
      );
    }

    // Filter by certifications (must have all selected certs)
    const cleanCert = certParam ? certParam.split(',').map(c => c.trim()).filter(Boolean) : [];
    if (cleanCert.length > 0) {
      results = results.filter((d) =>
        d.certifications && cleanCert.every(c => d.certifications?.includes(c))
      );
    }

    // Filter by inclusive care (must support all selected areas)
    const cleanInc = incParam ? incParam.split(',').map(i => i.trim()).filter(Boolean) : [];
    if (cleanInc.length > 0) {
      results = results.filter((d) =>
        d.inclusiveCare && cleanInc.every(i => d.inclusiveCare?.includes(i))
      );
    }

    // Filter by special circumstances (must support all selected circumstances)
    const cleanSpec = specParam ? specParam.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (cleanSpec.length > 0) {
      results = results.filter((d) =>
        d.specialCircumstances && cleanSpec.every(s => d.specialCircumstances?.includes(s))
      );
    }

    // Filter by support type (must offer all selected support types)
    const cleanSup = supParam ? supParam.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (cleanSup.length > 0) {
      results = results.filter((d) =>
        d.supportTypes && cleanSup.every(s => d.supportTypes?.includes(s))
      );
    }

    // Filter by languages spoken (match if doula speaks any of the selected languages)
    const cleanLang = langParam ? langParam.split(',').map(l => l.trim()).filter(Boolean) : [];
    if (cleanLang.length > 0) {
      results = results.filter((d) =>
        d.languages && cleanLang.some(l => d.languages?.includes(l))
      );
    }

    // Filter by pricing bounds
    results = results.filter((d) => {
      // If it is Birth Doula, check package pricing
      if (d.type === 'Birth' && d.packagesStartAt !== undefined) {
        if (d.packagesStartAt < minBirthFee || d.packagesStartAt > maxBirthFee) {
          return false;
        }
      }
      // If it is Postpartum Doula, check add-on hourly rate
      if (d.type === 'Postpartum' && d.addOnServicesStartAt !== undefined) {
        if (d.addOnServicesStartAt < minPostpartumRate || d.addOnServicesStartAt > maxPostpartumRate) {
          return false;
        }
      }
      // If Full Spectrum, check both if applicable
      if (d.type === 'Full Spectrum') {
        if (d.packagesStartAt !== undefined && (d.packagesStartAt < minBirthFee || d.packagesStartAt > maxBirthFee)) {
          return false;
        }
        if (d.addOnServicesStartAt !== undefined && (d.addOnServicesStartAt < minPostpartumRate || d.addOnServicesStartAt > maxPostpartumRate)) {
          return false;
        }
      }
      return true;
    });

    return NextResponse.json({ doulas: results }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected server error occurred.';

    console.error('[/api/doulas] Unhandled error:', message);

    return NextResponse.json({ message }, { status: 500 });
  }
}
