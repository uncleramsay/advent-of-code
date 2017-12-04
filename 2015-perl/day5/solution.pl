use strict;
use warnings;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

sub one {

  my $sRval = 0;
  foreach my $sLine (@aLines) {

    # Must have three vowels
    next if($sLine !~ /[aeiou].*[aeiou].*[aeiou]/);

    # Must contain a double letter
    next if($sLine !~ /(\w)\1/);

    # Must not contain certain strings
    next if($sLine =~ /ab|cd|pq|xy/);

    $sRval++;
  }

  return $sRval;
}

sub two {

  my $sRval = 0;
  foreach my $sLine (@aLines) {

    # Must have repeating pairs
    next if($sLine !~ /(\w{2}).*\1/);

    # Must contain a repeating letter with a separator
    next if($sLine !~ /(\w)\w\1/);

    $sRval++;
  }

  return $sRval;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
