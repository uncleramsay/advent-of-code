use strict;
use warnings;
use List::Util qw(min);
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
    my @aDimensions = $sLine =~ /(\d+)x(\d+)x(\d+)/;

    my $sArea1 = $aDimensions[0] * $aDimensions[1];
    my $sArea2 = $aDimensions[1] * $aDimensions[2];
    my $sArea3 = $aDimensions[0] * $aDimensions[2];

    $sRval += (2 * $sArea1) + (2 * $sArea2) + (2 * $sArea3) + min($sArea1, $sArea2, $sArea3);
  }

  return $sRval;
}

sub two {
  my $sRval = 0;

  foreach my $sLine (@aLines) {
    my @aDimensions = $sLine =~ /(\d+)x(\d+)x(\d+)/;
    @aDimensions = sort { $a <=> $b } @aDimensions;
    my $sVolume = $aDimensions[0] * $aDimensions[1] * $aDimensions[2];

    $sRval += (2 * $aDimensions[0]) + (2 * $aDimensions[1]) + $sVolume;
  }

  return $sRval;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
