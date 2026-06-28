import { NextRequest, NextResponse } from 'next/server';
import { mockDoulas } from '../../../lib/mockDoulas';
import { Doula } from '../../../types/doula';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');
    const typesParam = searchParams.get('types');
    const date = searchParams.get('date');
    const forceError = searchParams.get('error');

    const daysParam = searchParams.get('days');
    const careParam = searchParams.get('care');
    const certParam = searchParams.get('cert');
    const incParam = searchParams.get('inc');
    const specParam = searchParams.get('spec');
    const supParam = searchParams.get('sup');
    const langParam = searchParams.get('lang');

    const minBirthFee = Number(searchParams.get('minBirthFee') ?? '0');
    const maxBirthFee = Number(searchParams.get('maxBirthFee') ?? '3000');
    const minPostpartumRate = Number(searchParams.get('minPostpartumRate') ?? '0');
    const maxPostpartumRate = Number(searchParams.get('maxPostpartumRate') ?? '150');

    await new Promise<void>((resolve) => setTimeout(resolve, 300));

    if (forceError === 'true' || zip === '99999') {
      return NextResponse.json(
        { message: 'Unable to reach the doula directory right now. Please try again shortly.' },
        { status: 500 }
      );
    }

    let results: Doula[] = [...mockDoulas];

    const cleanZip = zip?.trim() ?? '';
    if (cleanZip.length > 0) {
      results = results.filter((d) => d.zipCode.startsWith(cleanZip));
    }

    if (typesParam && typesParam.trim().length > 0) {
      const selectedTypes = typesParam
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      if (selectedTypes.length > 0) {
        const mappedTypes = selectedTypes.map(t => {
          if (t.includes('Birth')) return 'Birth';
          if (t.includes('Postpartum')) return 'Postpartum';
          if (t.includes('Full Spectrum')) return 'Full Spectrum';
          return t;
        });
        results = results.filter((d) => mappedTypes.includes(d.type));
      }
    }

    const cleanDate = date?.trim() ?? '';
    if (cleanDate.length > 0) {
      results = results.filter((d) => d.availableDates.includes(cleanDate));
    }

    const cleanDays = daysParam ? daysParam.split(',').map(d => d.trim()).filter(Boolean) : [];
    if (cleanDays.length > 0) {
      results = results.filter((d) => 
        d.availableDays && cleanDays.some(day => d.availableDays?.includes(day))
      );
    }

    const cleanCare = careParam ? careParam.split(',').map(c => c.trim()).filter(Boolean) : [];
    if (cleanCare.length > 0) {
      results = results.filter((d) =>
        d.careOffered && cleanCare.every(c => d.careOffered?.includes(c))
      );
    }

    const cleanCert = certParam ? certParam.split(',').map(c => c.trim()).filter(Boolean) : [];
    if (cleanCert.length > 0) {
      results = results.filter((d) =>
        d.certifications && cleanCert.every(c => d.certifications?.includes(c))
      );
    }

    const cleanInc = incParam ? incParam.split(',').map(i => i.trim()).filter(Boolean) : [];
    if (cleanInc.length > 0) {
      results = results.filter((d) =>
        d.inclusiveCare && cleanInc.every(i => d.inclusiveCare?.includes(i))
      );
    }

    const cleanSpec = specParam ? specParam.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (cleanSpec.length > 0) {
      results = results.filter((d) =>
        d.specialCircumstances && cleanSpec.every(s => d.specialCircumstances?.includes(s))
      );
    }

    const cleanSup = supParam ? supParam.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (cleanSup.length > 0) {
      results = results.filter((d) =>
        d.supportTypes && cleanSup.every(s => d.supportTypes?.includes(s))
      );
    }

    const cleanLang = langParam ? langParam.split(',').map(l => l.trim()).filter(Boolean) : [];
    if (cleanLang.length > 0) {
      results = results.filter((d) =>
        d.languages && cleanLang.some(l => d.languages?.includes(l))
      );
    }

    results = results.filter((d) => {
      if (d.type === 'Birth' && d.packagesStartAt !== undefined) {
        if (d.packagesStartAt < minBirthFee || d.packagesStartAt > maxBirthFee) return false;
      }
      if (d.type === 'Postpartum' && d.addOnServicesStartAt !== undefined) {
        if (d.addOnServicesStartAt < minPostpartumRate || d.addOnServicesStartAt > maxPostpartumRate) return false;
      }
      if (d.type === 'Full Spectrum') {
        if (d.packagesStartAt !== undefined && (d.packagesStartAt < minBirthFee || d.packagesStartAt > maxBirthFee)) return false;
        if (d.addOnServicesStartAt !== undefined && (d.addOnServicesStartAt < minPostpartumRate || d.addOnServicesStartAt > maxPostpartumRate)) return false;
      }
      return true;
    });

    return NextResponse.json({ doulas: results }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected server error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
