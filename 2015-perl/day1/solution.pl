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

my $sBasementEntry = undef;

sub one {
  my @aChars = split('', $aLines[0]);
  my $sFloor = 0;

  my $sCount = 1;
  foreach my $sChar (@aChars) {
    if($sChar eq '(') {
      $sFloor++;
    } elsif($sChar eq ')') {
      $sFloor--;
    }

    if (!defined($sBasementEntry) && $sFloor < 0) {
      $sBasementEntry = $sCount;
    }

    $sCount++;
  }

  return $sFloor;
}

sub two {
  return $sBasementEntry;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
